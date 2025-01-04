import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Modal from "./Modal"

describe("Modal", () => {
  const setup = () => {
    const onClose = jest.fn()
    const content = "Modal content"

    return {
      onClose,
      content,
      render: (props = {}) =>
        render(
          <Modal isOpen={true} onClose={onClose} {...props}>
            {content}
          </Modal>
        )
    }
  }

  describe("renders", () => {
    test("nothing when closed", () => {
      const { content, render } = setup()

      render({ isOpen: false })
      expect(screen.queryByText(content)).toBeNull()
    })

    test("content when open", () => {
      const { content, render } = setup()

      render()
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe("interactions", () => {
    test("closes on backdrop click", () => {
      const { onClose, render } = setup()

      render()

      fireEvent.click(screen.getByRole("dialog"))
      expect(onClose).toHaveBeenCalled()
    })

    test("closes on button click", () => {
      const { onClose, render } = setup()

      render()

      userEvent.click(screen.getByRole("button"))
      expect(onClose).toHaveBeenCalled()
    })

    test("closes on escape key", () => {
      const { onClose, render } = setup()

      render()

      fireEvent.keyDown(document, { key: "Escape" })
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe("cleanup", () => {
    test("resets body style and removes listeners", () => {
      const { render } = setup()
      const { unmount } = render()

      expect(document.body.style.overflow).toBe("hidden")
      unmount()
      expect(document.body.style.overflow).toBe("unset")
    })
  })
})
