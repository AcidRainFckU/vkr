import React, { FC } from "react";
import PageLayout from "../../layouts/pageLayout";
import CoursePlate from "./CoursePlate";

type Props = {};

const HomePage: FC<Props> = (props: Props) => {
  return (
    <PageLayout>
      <h1 className="max-w-6xl mx-auto uppercase text-4xl font-black">
        Мои курсы
      </h1>
      <div className="max-w-6xl mx-auto  py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CoursePlate />
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
