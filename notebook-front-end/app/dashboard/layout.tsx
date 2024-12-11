interface MenuProps {
  children: React.ReactNode;
  date: React.ReactNode;
  superProp: React.ReactNode; // Cambiado el nombre
}

export default function RootLayout({ children, date, superProp }: MenuProps) {
  return (
    <div className="dashboard-layout bg-blue-950 flex">
      <main className="flex">
        {children}
        <aside className="sidebar">{date}</aside>
        <section className="analytics">{superProp}</section>
      </main>
    </div>
  );
}
