import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Shield, 
  User, 
  Calendar,
  FileText,
  Star,
  Award
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { format, formatDistanceToNow } from 'date-fns';

interface MentorApplication {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  credentials: any[];
  experience: string;
  motivation: string;
  specialties: string[];
  references: any[];
  admin_notes: string | null;
  profiles: {
    username: string;
    display_name: string;
    total_streak_days: number;
    longest_streak: number;
  };
}

export default function MentorApplications() {
  const [applications, setApplications] = useState<MentorApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchApplications();
    subscribeToApplications();
  }, []);

  async function fetchApplications() {
    const { data, error } = await supabase
      .from('mentor_applications')
      .select(`
        *,
        profiles (
          username,
          display_name,
          total_streak_days,
          longest_streak
        )
      `)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      return;
    }

    setApplications(data);
    setLoading(false);
  }

  function subscribeToApplications() {
    const subscription = supabase
      .channel('mentor_applications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'mentor_applications'
        },
        () => {
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  async function processApplication(applicationId: string, data: any) {
    const { error } = await supabase
      .rpc('process_mentor_application', {
        p_application_id: applicationId,
        p_status: data.status,
        p_notes: data.notes
      });

    if (error) {
      console.error('Error processing application:', error);
      return;
    }

    reset();
    setSelectedApp(null);
    fetchApplications();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-blue-700" size={24} />
          <h2 className="text-2xl font-bold">Mentor Applications</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-yellow-50 rounded-lg p-4">
            <Clock className="text-yellow-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">
              {applications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <CheckCircle className="text-green-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-700">
              {applications.filter(a => a.status === 'approved').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <XCircle className="text-red-700 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-700">
              {applications.filter(a => a.status === 'rejected').length}
            </p>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Applications</h3>
          <div className="space-y-4">
            {applications.map(app => (
              <div
                key={app.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedApp === app.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedApp(app.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="text-gray-500" size={16} />
                      <h4 className="font-semibold">
                        {app.profiles.display_name || app.profiles.username}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDistanceToNow(new Date(app.submitted_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className={`
                    px-2 py-1 rounded-full text-sm font-medium
                    ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${app.status === 'approved' ? 'bg-green-100 text-green-700' : ''}
                    ${app.status === 'rejected' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    {app.profiles.total_streak_days} days
                  </div>
                  <div className="flex items-center gap-1">
                    <Award size={14} />
                    {app.specialties.length} specialties
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Details */}
        {selectedApp && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Application Details</h3>
            {applications.find(a => a.id === selectedApp) && (
              <div className="space-y-6">
                {/* Application Info */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                  <p className="text-gray-600">
                    {applications.find(a => a.id === selectedApp)?.experience}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Motivation</h4>
                  <p className="text-gray-600">
                    {applications.find(a => a.id === selectedApp)?.motivation}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {applications.find(a => a.id === selectedApp)?.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Credentials</h4>
                  <div className="space-y-2">
                    {applications.find(a => a.id === selectedApp)?.credentials.map((credential: any, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg"
                      >
                        <FileText className="text-gray-500 mt-1" size={16} />
                        <div>
                          <p className="font-medium">{credential.title}</p>
                          <p className="text-sm text-gray-500">{credential.issuer}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(credential.date), 'MMM yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Form */}
                <form
                  onSubmit={handleSubmit(data => processApplication(selectedApp, data))}
                  className="space-y-4 border-t pt-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      {...register('status')}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add any notes about this application..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedApp(null);
                        reset();
                      }}
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 