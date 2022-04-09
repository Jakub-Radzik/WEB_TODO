import { toast } from 'react-toastify';

export const successToast = (msg: string) =>
  toast.success(`${msg}`, {
    containerId: 'main',
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const errorToast = (error: string) =>
  toast.error(`${error}`, {
    containerId: 'main',
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
