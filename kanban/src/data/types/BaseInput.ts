export type BaseInputProps = {
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    name: string;
    label?: string;
    placeholder?: string;
};
