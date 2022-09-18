import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import InviteForm from "./inviteForm";
import InviteConfirmed from "./inviteConfirmed";
import validateForm from "./inviteValidation";

interface InitialState {
  fullName: string;
  email: string;
  confirmEmail: string;
}

const initialState: InitialState = {
  fullName: "",
  email: "",
  confirmEmail: "",
};

const InviteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [sendMessage, setSendMessage] = useState("Send");
  const [backendError, setBackendError] = useState("");
  const [inputValues, setInputValue] = useState(initialState);
  const [validation, setValidation] = useState(initialState);

  const closeModal = () => {
    // reset states
    setInviteSuccess(false);
    setSendMessage("Send");
    setBackendError("");
    setInputValue(initialState);
    setValidation(initialState);

    // close modal
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    validateForm(inputValues);
  }, [inputValues]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { isValid, errors } = validateForm(inputValues);

    // if all fields are valid then clear any errors and call api
    if (isValid) {
      // reset errors and disable sne button
      setBackendError("");
      setValidation(initialState);
      setDisableSubmit(true);
      setSendMessage("Sending, please wait...");

      await fetch(
        "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputValues.fullName,
            email: inputValues.email,
          }),
        }
      )
        .then(async (response) => {
          // navigate to confirmation modal
          if (response.ok) {
            setBackendError("");
            setInviteSuccess(true);
            // show backend error message if not 400 OK
          } else if (!response.ok) {
            const errorData = await response.json();
            setBackendError(errorData.errorMessage);

            setSendMessage("Send");
          }

          setDisableSubmit(false);
        })
        .catch((error) => {
          console.log(error);
        });
      // if fields are not valid then set inline error message for fields
    } else if (!isValid) {
      setValidation(errors);
    }
  };

  return (
    <>
      {/* request an invite button */}
      <div className="flex justify-center align-center">
        <button
          type="button"
          onClick={openModal}
          className="w-64 py-2 text-xs font-medium text-green-900 border border-green-900 rounded-3xl md:text-base md:px-8 md:py-3 hover:bg-green-900 hover:text-green-50"
        >
          Request an invite
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={isOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              {/* use invite form for new request and trigger confirmation modal if invite went through */}
              {!inviteSuccess ? (
                <InviteForm
                  inviteSuccess={inviteSuccess}
                  disableSubmit={disableSubmit}
                  sendMessage={sendMessage}
                  backendError={backendError}
                  inputValues={inputValues}
                  validation={validation}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                ></InviteForm>
              ) : (
                <InviteConfirmed closeModal={closeModal}></InviteConfirmed>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InviteModal;
