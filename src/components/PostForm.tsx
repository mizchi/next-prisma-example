import { useCallback } from "react";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";
import { createPost } from "@/pages/api/createPost";

export function PostForm() {
  const router = useRouter();
  const onSubmit = useCallback(async (formData) => {
    const data = await createPost(formData);
    if (data.ok) {
      router.push("/");
    } else {
      alert(JSON.stringify(data));
    }
  }, []);
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field<HTMLInputElement>
              name="title"
              placeholder="title"
              render={(props) => {
                return (
                  <div>
                    <input
                      {...(props.input as any)}
                      style={{ width: "80vw" }}
                    />
                  </div>
                );
              }}
            />
            <Field<HTMLTextAreaElement>
              name="content"
              placeholder="content"
              render={(props) => {
                return (
                  <div>
                    <textarea
                      {...(props.input as any)}
                      style={{ width: "80vw", height: "300px" }}
                    />
                  </div>
                );
              }}
            />
            <button type="submit">Submit</button>
          </form>
        );
      }}
    ></Form>
  );
}
