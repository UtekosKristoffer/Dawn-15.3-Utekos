//async

handleSubmit(onSubmit)()

// You can pass an async function for asynchronous validation.
handleSubmit(async (data) => await fetchAPI(data))

//try/catch
const onSubmit = async () => {
  // async request which may result error
  try {
    // await fetch()
  } catch (e) {
    // handle your error
  }
}

return <form onSubmit={handleSubmit(onSubmit)} />


  //Async

  import { useForm } from "react-hook-form";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    await sleep(2000);
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">User Name</label>
      <input placeholder="Bill" {...register("username"} />


      <input type="submit" />
    </form>
  );
}


//sync

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"


type FormValues = {
  firstName: string
  lastName: string
  email: string
}


export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const onError: SubmitErrorHandler<FormValues> = (errors) =>
    console.log(errors)


  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />


      <input type="submit" />
    </form>
  )
}
