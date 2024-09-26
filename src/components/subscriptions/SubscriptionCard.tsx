type SubscriptionCardProps = {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  currentPlan?: boolean;
  highlight?: boolean;
  highlightText?: string;
  buttonAction: () => void;
};

export default function SubscriptionCard(props: SubscriptionCardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg border border-gray-300 shadow-sm overflow-hidden ${
        props.currentPlan || props.highlight ? "border-black" : ""
      }`}
    >
      {props.currentPlan && (
        <div className="px-6 py-3 bg-black text-white text-sm font-semibold uppercase text-center">
          Current plan
        </div>
      )}
      {props.highlight && (
        <div className="px-6 py-3 bg-gray-200 text-black text-sm font-semibold uppercase text-center">
          {props.highlightText}
        </div>
      )}
      <div className="px-6 py-8 flex-grow">
        <h2 className="text-2xl font-semibold mb-4">{props.title}</h2>
        <p className="text-4xl font-bold mb-6">
          {props.price}
          <span className="text-lg font-medium text-gray-600">/mo</span>
        </p>
        <ul className="space-y-4">
          {props.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg
                className="w-6 h-6 text-black flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-3 text-base text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-6 bg-gray-50">
        <button
          onClick={props.buttonAction}
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none transition duration-300"
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
