/* eslint-disable react/prop-types */

export default function Message({ isSuccess, message }) {
  return (
    <p
      className={`text-center font-medium text-base ${
        isSuccess ? "text-green-600" : "text-red-600"
      }`}
    >
      {message}
    </p>
  );
}
