import type { Meta, StoryObj } from '@storybook/react-vite';
import  { useState } from 'react';
import ToastContainer, { ToastItem } from '../src/ui/toast/ToastContainer';
import ToastContext from '../src/ui/toast/ToastContext';
import Button from '../src/ui/Button';
import { Colors } from '../src/utils/enums';

//These stories needs to be updated with args and argsTypes
const meta: Meta<typeof ToastContainer> = {
  title: 'GAELO FLOW UI/ToastContainer',
  component: ToastContainer,
} satisfies Meta<typeof ToastContainer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InteractiveToastContainer: Story = {
  render: () => {
    const [ , setToasts] = useState<ToastItem[]>([]);

    // Function to simulate adding a toast
    const addToast = (toast: ToastItem) => {
      setToasts(currentToasts => [...currentToasts, toast]);
    };

    // Simulated pushToastRef function
    const pushToastRef = {
      current: (toast: Omit<ToastItem, 'id' | 'timer'>) => {
        const id = Math.random();
        const timer = setTimeout(() => {
          setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
        }, toast.duration * 1000);

        addToast({ ...toast, id, timer });
      }
    };

    // Simulated updateToastRef function
    const updateToastRef = {
      current: (id: number, newToastData: Partial<ToastItem>) => {
        setToasts(currentToasts => currentToasts.map(t => t.id === id ? { ...t, ...newToastData } : t));
      }
    };

    // This is the context value we'll provide to the ToastContainer
    const contextValue = {
      pushToastRef,
      updateToastRef
    };

    return (
      <ToastContext.Provider value={contextValue as any}>
        <div className="container">
          <Button color={Colors.success} className='' onClick={() => pushToastRef.current({ content: 'Success Toast', type: 'success', animation: 'slide-right', position: 'bottom-right', duration: 5 })}>Add Success Toast</Button>
          <Button color={Colors.danger} onClick={() => pushToastRef.current({ content: 'Danger Toast', type: 'danger', animation: 'slide-right', position: 'bottom-right', duration: 5 })}>Add Danger Toast</Button>
          {/* Add more buttons for different types as needed */}
        </div>
        <ToastContainer />
      </ToastContext.Provider>
    );
  }
};
