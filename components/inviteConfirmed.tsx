import { Dialog } from "@headlessui/react";
import { MouseEventHandler } from "react";

function InviteConfirmed(props: {
  closeModal: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-center align-middle transition-all transform shadow-2xl rounded-3xl bg-green-50">
      <Dialog.Title
        as="h3"
        className="text-xl font-bold leading-6 text-green-900 md:text-2xl"
      >
        All done!
      </Dialog.Title>

      <hr className="w-16 mx-auto my-8 border border-green-600"></hr>

      <div className="grid grid-cols-2 gap-6">
        <p className="text-sm text-green-900 col-span-full md:text-base">
          You will be one of the first to experience Broccoli & Co. when we
          launch.
        </p>

        <button
          type="button"
          className="justify-center py-1 mt-2 font-medium text-green-800 border border-green-600 col-span-full rounded-3xl md:text-base md:py-2 md:mt-4 hover:bg-green-900 hover:text-green-50 disabled:hover:bg-green-100 disabled:hover:text-green-800"
          onClick={props.closeModal}
        >
          OK
        </button>
      </div>
    </Dialog.Panel>
  );
}

export default InviteConfirmed;
