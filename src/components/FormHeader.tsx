const FormHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-h4-l-semibold text-brand-900">{title}</p>
      <p className="text-l-regular text-black">{subtitle}</p>
    </div>
  );
};

export default FormHeader;
