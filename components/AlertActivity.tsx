import Image from 'next/image'

const AlertActivity = ({ text }: { text: string }) => {
  return (
    <div
      className="flex gap-2 w-[490px] bg-white rounded-xl shadow-xl p-4"
      data-cy="modal-information"
    >
      <Image
        src="/modal-information-icon.png"
        width="24"
        height="24"
        alt="alert"
        data-cy="modal-information-icon"
      />
      <p data-cy="modal-information-title">{text} berhasil dihapus</p>
    </div>
  )
}

export default AlertActivity
