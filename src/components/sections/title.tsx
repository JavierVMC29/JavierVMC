interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle = ({
  title,
  description,
}: SectionTitleProps) => {
  return (
    <section className="flex flex-col gap-4 max-w-xl">
      <h2 className="text-3xl sm:text-5xl font-bold text-center">
        {title}
      </h2>
      <p className="text-lg sm:text-xl text-center text-secondary whitespace-break-spaces leading-[160%]">
        {description}
      </p>
    </section>
  )
}

export default SectionTitle