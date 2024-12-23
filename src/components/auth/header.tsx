interface HeaderProps {
  headerLabel: string;
  descriptionLabel: string;
}

export const Header = ({ headerLabel, descriptionLabel }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-semibold">{headerLabel}</h1>
      <p className="text-sm text-muted-foreground">{descriptionLabel}</p>
    </div>
  );
};
