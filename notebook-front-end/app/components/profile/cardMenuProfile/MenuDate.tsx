interface MenuItem {
  label: string;
  className?: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  action: () => void;
  color?: string;
}

interface DropdownMenuProps {
  menuItems: MenuItem[];
  isVisible: boolean;
  onClose: () => void; // Para cerrar el menú desde el padre
}

export default function MenuDate({
  menuItems,
  isVisible,
  onClose,
}: DropdownMenuProps) {
  if (!isVisible) return null; // No renderizar si no está visible

  return (
    <div className="absolute right-0 w-40 bg-white border rounded-lg shadow-lg z-10">
      <ul className="py-1">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 text-gray-800"
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            <item.icon
              className="mr-2 h-5 w-5 text-gray-600"
              style={{ color: item.color || "inherit" }}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
