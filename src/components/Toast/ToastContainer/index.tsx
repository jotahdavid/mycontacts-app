import { useEffect, useState } from 'react';

import { ToastEventManager } from '@utils/toast';
import type { ToastPayload } from '@utils/toast';

import { ToastMessage } from '@components/Toast/ToastMessage';
import type { ToastMessageType } from '@components/Toast/ToastMessage';
import { Container } from './styles';

interface Message {
  id: number;
  type: ToastMessageType;
  text: string;
}

export function ToastContainer() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text }: ToastPayload) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    ToastEventManager.on('addtoast', handleAddToast);
    return () => ToastEventManager.removeListener('addtoast', handleAddToast);
  }, []);

  function handleRemoveMessage(id: number) {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
