interface NotificationBoxProps {
  label?: string
  value?: string
  children?: React.ReactNode
  className?: string
}

const NotificationBox: React.FC<NotificationBoxProps> = ({
  label,
  value,
  children,
  className,
}) => {
  const spanJsx =
    label !== undefined && value !== undefined ? (
      <>
        <span className="font-bold">{label}</span> <span>{value}</span>
      </>
    ) : (
      <></>
    )
  return (
    <div className={`bg-[rgba(30,123,150,0.1)] px-6 py-3 ${className}`}>
      {spanJsx}
      {children}
    </div>
  )
}

export default NotificationBox
