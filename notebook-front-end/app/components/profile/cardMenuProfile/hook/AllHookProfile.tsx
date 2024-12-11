import { useState } from "react";

export const AllHookProfile = () => {
  // Aseguramos que isShowMenu sea un booleano
  const [isShowMenu, setIsShowMenu] = useState(false); // Estado para mostrar u ocultar el menú

  return { isShowMenu, setIsShowMenu };
};
