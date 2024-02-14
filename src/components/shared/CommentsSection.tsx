import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PostComeents } from "@/lib/validation";

const CommentsSection: React.FC = () => {
  const [showInput, setShowInput] = useState<boolean>(false);

  const toggleInput = () => {
    setShowInput((prevState) => !prevState);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostComeents>>({
    resolver: zodResolver(PostComeents),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostComeents>) {
    console.log(values);
    form.reset(); // Clear form values
    setShowInput(false);
  }

  const onCancel = () => {
    form.reset(); // Clear form values
    setShowInput(false);
  };

  return (
    <div className="mt-5">
      <button onClick={toggleInput}>Comments</button>
      {showInput && (
        <div className="mt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-9 w-full max-w-5xl"
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">
                      Add Comments
                    </FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-center justify-end">
                <Button
                  type="button"
                  className="shad-button_dark_4"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                  // disabled={isLoadingCreate || isLoadingUpdate}
                >
                  {/* {(isLoadingCreate || isLoadingUpdate) && "Loading..."} */}
                  {/* {action}  */}
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
