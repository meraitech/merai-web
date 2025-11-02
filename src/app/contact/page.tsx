import { H2HeaderUI } from "@/components/ui/h2-header.ui";

export default function Contact() {
  return (
    <main className="mt-40">
      <div className="grid gap-20 px-8">
        <H2HeaderUI
          headerText="Get in touch"
          p="We`re thrilled that you`re here, give us a few details about your project and we'll be in touch."
        />

        {/* <section className="mx-auto w-full max-w-[1200px] grid md:grid-cols-2 gap-8 ">
          <input
            type="text"
            name=""
            id=""
            placeholder="Full Name"
            className="p-4 border-b border-foreground/20 outline-none"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Email Address"
            className="p-4 border-b border-foreground/20 outline-none"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Phone Number"
            className="p-4 border-b border-foreground/20 outline-none"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Company Name"
            className="p-4 border-b border-foreground/20 outline-none"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Tell us about your company"
            className="md:col-span-2 p-4 border-b border-foreground/20 outline-none"
          />

          <button className="md:col-span-2 ml-auto p-4 bg-foreground text-background">
            Submit Form
          </button>
        </section> */}

        <section className="mx-auto">
          <span className="text-2xl outline-none border-b border-foreground/20 p-4 ">
            meraitech27@gmail.com
          </span>
        </section>
      </div>
    </main>
  );
}
