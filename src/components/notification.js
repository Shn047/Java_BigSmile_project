import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const SuccessNoti = (text) => toast.success(text);
export const ErrorNoti = (text) => toast.error(text);