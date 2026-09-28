import { FAQ_ITEMS } from "@/helpers/faq";

const Faq = () => {
  return (
    <section aria-labelledby="faq-heading" className="mt-12 w-full max-w-2xl">
      <h2
        id="faq-heading"
        className="text-lg font-semibold text-white text-center mb-4"
      >
        Frequently asked questions
      </h2>
      <dl className="flex flex-col gap-4">
        {FAQ_ITEMS.map(({ question, answer }) => (
          <div key={question}>
            <dt className="text-sm font-medium text-[#CFB53B]">{question}</dt>
            <dd className="text-sm text-gray-300 mt-1">{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Faq;
