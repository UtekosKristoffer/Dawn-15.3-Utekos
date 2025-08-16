import { useForm, Form } from "react-hook-form"
function App() {
  const {
    control,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm()
  return (
    <Form
      action="/api"
      control={control}
      render={({ submit }) => {
        ;<View>
          {isSubmitSuccessful && <Text>Form submit successful.</Text>}


          {errors?.root?.server && <Text>Form submit failed.</Text>}
          <Button onPress={() => submit()} />
        </View>
      }}
    />
  )
}
