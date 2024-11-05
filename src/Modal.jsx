import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react"
import "./styles/modal-component.scss"

/* Using forwardRef exposes this modal to the parent component with a ref */
const Modal = forwardRef(({ title, icon, message, theme, closeIconPath }, ref) => {
	const dialogRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)

	/* Exposes these functions to the parent component.
	   These functions change the state variable for the modal component */
	useImperativeHandle(ref, () => ({
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
	}))

	useEffect(() => {
		if (isOpen && dialogRef.current) {
			dialogRef.current.showModal()
		} 
		else if (dialogRef.current) {
			dialogRef.current.close()
		}
	}, [isOpen])

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleKeyDown = (e) => {
		if (e.code === "Escape") {
			handleClose()
		}
	}

	/* Returns the modal component with a reference for exposure.
	   The theme prop sets the theme defined in the parent component. */
  	return (
		<dialog ref={dialogRef} className={`modal ${theme || ""} ${isOpen ? "show" : ""}`} onKeyDown={handleKeyDown}>
			<img src={closeIconPath} alt="Close" onClick={handleClose} className="modal-close" />
			{title && (
				<h1 className="modal-title">
					{icon && (<img src={icon} alt="Icon" className="modal-title-icon"/>)}
					{title}
				</h1>
			)}
			{message && (
				<p className="modal-message">{message}</p>
			)}
		</dialog>
  	)
})

export default Modal