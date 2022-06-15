import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAuth from '../hooks/auth';
import { useAppSelector } from '../hooks/useAppSelector';
import { User } from '../redux/user/types';
import '../sass/App.scss';
import ProtectedRoute from './layouts/ProtectedRoleRoute';
import ErrorPage from './pages/404';
import AdminPanel from './pages/admin/adminPanel';
import AdminUsers from './pages/admin/users/AdminUsers';
import CoursesComponent from './pages/admin/courses/CoursesComponent';
import HomePage from './pages/courses/homePage';
import Login from './pages/login';
import Registration from './pages/registration';
import Settings from './pages/settings';
import { useDispatch } from 'react-redux';
import { setCoursesAction } from '../redux/course/course.actions';
import CoursePage from './pages/CoursePage';
import { Course } from '../redux/course/types';
import LessonComponent from './pages/courses/LessonComponent';
import HomeworksPage from './pages/admin/HomeworksPage';
import CreateLesson from './pages/courses/CreateLesson';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { checkAuth } = useAuth();
  const dispatch = useDispatch();
  const user: User = useAppSelector((store) => store.user) as User;
  const course: Course[] = useAppSelector((store) => store.courses);

  useEffect(() => {
    async function asyncCheckAuth() {
      await checkAuth();
    }
    dispatch(setCoursesAction());
    asyncCheckAuth();
  }, []);

  if (user?.banned) {
    return (
      <div className="App min-h-screen">
        <Routes>
          <Route path="/banned" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/banned" replace />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="App min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/courses">
          <Route index element={<HomePage />} />

          <Route path=":courseId">
            <Route index element={<CoursePage course={course} />} />
            <Route path=":chapterId/:lessonId" element={<LessonComponent course={course} />} />
            <Route path=":chapterId/create-lesson" element={<CreateLesson />} />
          </Route>
        </Route>
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRoute condition={['superuser']}>
                <AdminPanel currentTab={1}>{<AdminUsers />}</AdminPanel>
              </ProtectedRoute>
            }
          />
          <Route
            path="course"
            element={
              <ProtectedRoute condition={['superuser']}>
                <AdminPanel currentTab={2}>
                  <CoursesComponent />
                </AdminPanel>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/homeworks" element={<HomeworksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
