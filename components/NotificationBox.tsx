interface NotificationBoxProps {
  label: string
  value: string
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ label, value }) => {
  return (
    <div className="bg-[rgba(30,123,150,0.1)] px-6 py-3">
      <span className="font-bold">{label}</span> <span>{value}</span>
    </div>
  )
}

export default NotificationBox
