import React from 'react';

const Faq = () => {
    const faq=[
      {
        question: "What is the Food Expiry Tracker System?",
        answer:
          "It's a full-stack web application designed to help users monitor and manage food items with expiry dates. It promotes smarter food usage and reduces waste.",
      },
      {
        question: "How does the system notify about upcoming expiries?",
        answer:
          "The system highlights items nearing expiry and can display time-counts on the details page to ensure timely consumption or disposal.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes. The app uses secure authentication and follows best practices to ensure your food inventory and personal information are protected.",
      },
      {
        question: "Can I edit or update food entries?",
        answer:
          "Absolutely. You can add, update, or delete food items anytime. The system is built with complete CRUD functionality.",
      },
      {
        question: "Is this app mobile-friendly?",
        answer:
          "Yes, the UI is fully responsive and works smoothly on both desktop and mobile devices for convenient tracking on the go.",
      },
      {
        question: "Who can benefit from this app?",
        answer:
          "It’s ideal for individuals, families, meal preppers, and even small food businesses who want better control over food usage and expiry tracking.",
      },
    ]
    return (
       <div className="max-w-6xl py-12 mx-auto px-6">
  <div className="text-center mb-12">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
      Frequently Asked Questions
    </h2>
    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Learn more about how our Food Expiry Tracker works, its features, and how it helps reduce food waste.
    </p>
  </div>
  <div className="space-y-6">
    {faq.map((faq, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition"
      >
        <h4 className="text-lg font-semibold text-indigo-600 mb-2">
          {faq.question}
        </h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          {faq.answer}
        </p>
      </div>
    ))}
  </div>
</div>

    );
};

export default Faq;