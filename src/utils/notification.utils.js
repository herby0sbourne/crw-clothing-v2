import { toast } from 'react-toastify';

const showToastMessage = (type, message, id = null) => {
    // toast.update(id, { render: 'Creating user failed', type: 'error', isLoading: false });
    if (id) {
        toast.update(id, {
            render: `${message}`,
            type: `${type}`,
            isLoading: false,
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        return;
    }

    return toast[type](`${message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });

    // toast[type](`${message}`, {
    //   position: 'top-center',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'light',
    // });
};

export default showToastMessage;
