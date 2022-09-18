import { Dialog } from "@headlessui/react";

function InviteForm(props: {
  inviteSuccess: boolean;
  disableSubmit: boolean;
  sendMessage: string;
  backendError: string;
  inputValues: {
    fullName: string;
    email: string;
    confirmEmail: string;
  };
  validation: {
    fullName: string;
    email: string;
    confirmEmail: string;
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-center align-middle transition-all transform shadow-2xl rounded-3xl bg-green-50">
      <Dialog.Title
        as="h3"
        className="text-xl font-bold leading-6 text-green-900 md:text-2xl"
      >
        Request an invite
      </Dialog.Title>

      <hr className="w-16 mx-auto my-8 border border-green-600"></hr>

      <form method="POST">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-full">
            <input
              placeholder="Full Name"
              type="text"
              name="fullName"
              onChange={props.handleChange}
              value={props.inputValues.fullName.trim()}
              className="w-full px-6 py-2 text-sm border border-green-600 outline-none rounded-3xl md:text-base focus:ring-2 focus:ring-green-600"
            ></input>
            {props.validation.fullName && (
              <p id='error-full-name' className="pt-1 text-xs text-red-600">
                {props.validation.fullName}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={props.handleChange}
              value={props.inputValues.email.trim()}
              className="w-full px-6 py-2 text-sm border border-green-600 outline-none rounded-3xl md:text-base focus:ring-2 focus:ring-green-600"
            ></input>
            {props.validation.email && (
              <p id='error-email' className="pt-1 text-xs text-red-600">
                {props.validation.email}
              </p>
            )}
          </div>

          <div className="col-span-full">
            <input
              placeholder="Confirm Email"
              type="text"
              name="confirmEmail"
              onChange={props.handleChange}
              value={props.inputValues.confirmEmail.trim()}
              className="w-full px-6 py-2 text-sm border border-green-600 outline-none rounded-3xl md:text-base focus:ring-2 focus:ring-green-600"
            ></input>
            {props.validation.confirmEmail && (
              <p id='error-confirm-email' className="pt-1 text-xs text-red-600">
                {props.validation.confirmEmail}
              </p>
            )}
          </div>

          <button
            className="justify-center py-1 mt-2 font-medium text-green-900 border border-green-600 col-span-full rounded-3xl md:text-base md:py-2 md:mt-4 hover:bg-green-900 hover:text-green-50 disabled:hover:bg-green-50 disabled:hover:text-green-800"
            disabled={props.disableSubmit}
            onClick={props.handleSubmit}
          >
            {props.sendMessage}
          </button>

          {/* backend error message */}
          <div className="col-span-full">
            {props.backendError && (
              <p id='error-backend' className="pt-2 text-xs text-red-600">{props.backendError}</p>
            )}
          </div>
        </div>
      </form>
    </Dialog.Panel>
  );
}

export default InviteForm;
