import { useParams } from "react-router-dom";
import {
  useGetAuthUser,
  useGetProfileByUsername,
} from "../hooks/useGetQueryActions";

import ProfileHeader from "../components/profile/sections/ProfileHeader";
import AboutSection from "../components/profile/sections/AboutSection";
import ExperienceSection from "../components/profile/sections/ExperienceSection";
import EducationSection from "../components/profile/sections/EducationSection";
import SkillsSection from "../components/profile/sections/SkillsSection";

const ProfilePage = () => {
  const { username } = useParams();
  const { authUser, isLoading: isAuthUserLoading } = useGetAuthUser();
  const { profile, isLoading: isUserProfileLoading } =
    useGetProfileByUsername(username);

  if (isAuthUserLoading || isUserProfileLoading) {
    return null;
  }

  const isOwnProfile = authUser.username === profile.username;
  const userData = isOwnProfile ? authUser : profile;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} />
      <AboutSection userData={userData} isOwnProfile={isOwnProfile} />
      <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} />
      <EducationSection userData={userData} isOwnProfile={isOwnProfile} />
      <SkillsSection />
    </div>
  );
};

export default ProfilePage;
