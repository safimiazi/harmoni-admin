type SectionTitleProps = {
  title: string;
};

export const Title = ({ title }: SectionTitleProps) => {
  return (
    <h1 className="text-[var(--color-textSecondary)] font- text-3xl sm:text-4xl font-Robot font-medium leading-[40px]  ">
      {title}
    </h1>
  );
};

export default Title;
