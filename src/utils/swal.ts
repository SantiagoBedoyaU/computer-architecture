import Swal, { SweetAlertOptions } from "sweetalert2";

export const Alert = ({
  icon = "error",
  title = "Error",
  ...props
}: SweetAlertOptions) =>
  Swal.fire({
    color: "#0F0F0F",
    confirmButtonColor: "#00ff66",
    iconColor: "#00ff66",
    denyButtonColor: "#FF9F00",
    title,
    icon,
    ...props,
  });
