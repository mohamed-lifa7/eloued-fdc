export default async function AssignmentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="my-20 flex-1 space-y-4 p-5">{children}</main>;
}
