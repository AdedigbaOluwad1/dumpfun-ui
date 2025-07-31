export interface iWallet {
  id: string;
  address: string;
  label: string;
  isPrimary: boolean;
  isActive: boolean;
  profileId: string;
  createdAt: string;
  updatedAt: string;
}

export interface iUserProfile {
  id: string;
  name: string;
  avatar: string;
  traderType: string;
  description: string;
  wallets: Wallet[];
  createdAt: string;
  updatedAt: string;
}

export interface iCreateUserProfile {
  name: string;
  avatar: string;
  traderType: string;
  description: string;
  wallets: iCreateWallet[];
}

export interface iCreateWallet {
  address: string;
  label: string;
  isPrimary: boolean;
}
