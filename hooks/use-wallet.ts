import { useState } from 'react';

export const useWallet = () => {
	const [connected, setConnected] = useState(false);
	const [publicKey, setPublicKey] = useState<string | null>(null);

	const connect = () => {
		setConnected(true);
		setPublicKey('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM');
	};

	const disconnect = () => {
		setConnected(false);
		setPublicKey(null);
	};

	return { connected, publicKey, connect, disconnect };
};
