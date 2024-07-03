// '../index.js' ;  // Import your CSS file

//@tailwind base;
// @tailwind components;
// @tailwind utilities;

// @layer components {
//     .form__input:focus ~ .form__label,
//     .form__input:not(:placeholder-shown).form__input:not(:focus) ~ .form__label {
//         @apply -top-2 left-3 text-xs;
//     }
// }
interface FloatingLabelInputProps {
    label: string;
    type?: string;
    id: string;
    name: string;
    fn: React.Dispatch<React.SetStateAction<string>>;
  }

export const FloatingLabelInput: React.FC<FloatingLabelInputProps>=({ label, type = "text", id, name , fn })=>{
  return (
      <div className="relative m-2 form w-80 h-12">
          <input 
              type={type} 
              id={id} 
              name={name} 
              placeholder=" "
              autoComplete="off"
              onChange={(e)=>fn(e.target.value)}
              className="form__input absolute inset-0 w-full h-full border-2 border-yellow-100 rounded-md text-yellow-100 outline-none p-5 bg-transparent focus:border-yellow-500 hover:border-yellow-300"
          />
          <label 
              htmlFor={id} 
              className="form__label absolute left-4 top-3 text-yellow-100 cursor-text transition-all duration-200 ease-in bg-yellow-900 px-2"
          >
              {label}
          </label>
      </div>
  );
}
export default FloatingLabelInput;