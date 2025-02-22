export default function TrustIndicators() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-lg font-semibold leading-8 text-indigo-600">
              Trusted by thousands on their NoFap journey
            </h2>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-50 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 flex items-center justify-center gap-x-8">
            {testimonials.map((testimonial, idx) => (
              <figure key={idx} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                <blockquote className="text-gray-900">
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <div className="text-sm">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.achievement}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const stats = [
  { id: 1, name: 'Active Users', value: '10,000+' },
  { id: 2, name: 'Success Stories', value: '2,500+' },
  { id: 3, name: 'Days Focused', value: '1M+' },
  { id: 4, name: 'Community Members', value: '15,000+' },
]

const testimonials = [
  {
    quote: "FocusPath helped me break free from addiction and regain control of my life. The community support is incredible.",
    author: "Anonymous",
    achievement: "365+ Days Streak"
  },
  {
    quote: "The best NoFap app I've used. The progress tracking and daily motivation keep me going.",
    author: "Anonymous",
    achievement: "180+ Days Streak"
  }
] 