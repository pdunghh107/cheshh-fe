import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Địa chỉ email không hợp lệ"),
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
    email: z.email("Địa chỉ email không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải từ 8 ký tự trở lên")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/,
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
      ),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
