export function AdminLoading() {
  return (
    <div className="admin-skeleton" role="status" aria-label="Загрузка данных">
      <span /><span /><span />
    </div>
  );
}

export function AdminError({ children }: { children: React.ReactNode }) {
  return children ? <p className="admin-alert admin-alert--error" role="alert">{children}</p> : null;
}

export function AdminSuccess({ children }: { children: React.ReactNode }) {
  return children ? <p className="admin-alert admin-alert--success" role="status">{children}</p> : null;
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export const roleLabels = { PATIENT: "Пациент", SPECIALIST: "Специалист", EDITOR: "Редактор", ADMIN: "Администратор" };
export const verificationLabels = { PENDING: "На проверке", APPROVED: "Подтверждена", REJECTED: "Отклонена" };
export const contentStatusLabels = { DRAFT: "Черновик", PUBLISHED: "Опубликован", ARCHIVED: "Архив" };
