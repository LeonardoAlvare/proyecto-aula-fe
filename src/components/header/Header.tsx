import { Avatar } from "primereact/avatar";
import { Toolbar } from "primereact/toolbar";
import useAuthStore from "../../store/auth/auth.store";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { MenuItem } from "primereact/menuitem";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = useAuthStore((state) => state.userLogged);
  const logout = useAuthStore((state) => state.logout);
  const fullname = `${user?.name} ${user?.lastname}`;
  const menuLeft = useRef<Menu>(null);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      label: "Perfil",
      icon: "pi pi-user",
      command: () => navigate(`/profile`),
    },
    {
      label: "PowerBI",
      icon: "pi pi-cog",
      command: () => navigate(`/power-bi`),
    },
    {
      label: "Predicciones",
      icon: "pi pi-cog",
      command: () => navigate(`/predictions`),
    },
    {
      label: "Mis postulaciones",
      icon: "pi pi-list",
      command: () => navigate(`/proposal/${user?._id}`),
    },
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: logout,
    },
  ];

  const startContent = (
    <>
      <img alt="Logo" src="/logo.png" className="w-20 h-auto" />
    </>
  );

  const endContent = (
    <>
      <Button
        text
        className="flex items-center gap-2 cursor-pointer"
        onClick={(event) => menuLeft?.current?.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup
      >
        <Avatar
          image={`https://ui-avatars.com/api/?name=${fullname}&format=svg&background=random&bold=true`}
          size="large"
          shape="circle"
        />
        <span className="font-bold text-bluegray-50">{fullname}</span>
        <Ripple />
        <Menu model={menuItems} popup ref={menuLeft} id="popup_menu_left" />
      </Button>
    </>
  );

  return (
    <div>
      <Toolbar start={startContent} end={endContent} />
    </div>
  );
}

export default Header;
