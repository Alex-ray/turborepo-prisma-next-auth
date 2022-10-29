import { useState } from "react";

const useOpenClose = () => {
  const [open, setSidebarOpen] = useState(false);

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleOpen = () => {
    setSidebarOpen(true);
  };

  return {
    open,
    onClose: handleClose,
    onOpen: handleOpen,
  };
};

export default useOpenClose;
