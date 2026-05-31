type SpinnerProps = {
    size?: "sm" | "md" | "lg" | "xl";
    label?: string;
};

const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-[3px]",
    xl: "h-14 w-14 border-4",
};

export default function Spinner({
    size = "md",
    label,
}: SpinnerProps) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className={`
                    ${sizes[size]}
                    animate-spin
                    rounded-full
                    border-border
                    border-t-brand
                `}
            />

            {label && (
                <p className="text-sm text-text-dim">
                    {label}
                </p>
            )}
        </div>
    );
}