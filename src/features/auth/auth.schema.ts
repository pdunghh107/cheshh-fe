import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Địa chỉ email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Tên người dùng phải từ 3 ký tự trở lên")
      .max(30, "Tên người dùng tối đa 30 ký tự")
      .regex(/^[a-zA-Z0-9_]+$/, "Chỉ chứa chữ cái, số và dấu gạch dưới"),
    email: z
      .string()
      .min(1, "Vui lòng nhập email")
      .email("Địa chỉ email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
