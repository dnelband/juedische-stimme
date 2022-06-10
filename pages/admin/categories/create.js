import styles from 'styles/Home.module.css'
import CategoryForm from 'components/admin/CategoryForm'

export default function CreateCategoryPage({maxId}) {
  return (
    <div className={styles.container}>
        <CategoryForm />
    </div>
  )
}

CreateCategoryPage.layout = "admin";