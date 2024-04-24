export function isAdmin(email?: string | null) {
  const lowercaseEmail = email?.toString().toLowerCase();
  const admins = [
    "sawyer.codes.stuff@gmail.com",
    "sawyerbivens06@gmail.com",
    "jbpulliam06@gmail.com",
  ];
  return admins.includes(lowercaseEmail ?? "");
}
