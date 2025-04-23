
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Calendar } from "lucide-react";

interface SidebarProps {
  profileData: any;
  isEditing: boolean;
  handleEditProfile: () => void;
  cancelEditProfile: () => void;
  saveProfileChanges: () => void;
  editProfileData: any;
  setEditProfileData: (val: any) => void;
  EDIT_BUTTON_COLOR: string;
  PROGRAMS: string[];
  ROLES: string[];
  PREDEFINED_INTERESTS: string[];
  HobbyTagsInput: any;
  Textarea: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  profileData,
  isEditing,
  handleEditProfile,
  cancelEditProfile,
  saveProfileChanges,
  editProfileData,
  setEditProfileData,
  EDIT_BUTTON_COLOR,
  PROGRAMS,
  ROLES,
  PREDEFINED_INTERESTS,
  HobbyTagsInput,
  Textarea,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-md shadow-sm border border-border p-4">
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm uppercase text-muted-foreground mb-1">STUDENT</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{profileData.department}</p>
                  <p className="text-sm text-muted-foreground">{profileData.university}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Year {profileData.year}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div><span className="font-medium">Joined:</span> {profileData.joined}</div>
                <div><span className="font-medium">Program:</span> {profileData.program}</div>
                <div><span className="font-medium">Course:</span> {profileData.course}</div>
                <div><span className="font-medium">Role:</span> {profileData.role}</div>
                <div><span className="font-medium">Hobbies:</span> {profileData.hobbies.join(", ")}</div>
                <div><span className="font-medium">Interests:</span> {profileData.interests.join(", ")}</div>
                <div><span className="font-medium">Achievements:</span> <span dangerouslySetInnerHTML={{ __html: profileData.achievements }} /></div>
                <div>
                  <span className="font-medium">About Me:</span>
                  <div className="text-sm">{profileData.aboutMe}</div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-0"
              style={{ background: EDIT_BUTTON_COLOR }}
              onClick={handleEditProfile}
            >
              <Pencil className="h-4 w-4 mr-1" />
              EDIT
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm uppercase text-muted-foreground mb-1">EDIT PROFILE</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.name}
                    onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Bio</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.bio}
                    onChange={e => setEditProfileData({ ...editProfileData, bio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Department</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.department}
                    onChange={e => setEditProfileData({ ...editProfileData, department: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">University</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.university}
                    onChange={e => setEditProfileData({ ...editProfileData, university: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Year</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.year}
                    onChange={e => setEditProfileData({ ...editProfileData, year: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Joined</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.joined}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Program</label>
                  <select
                    className="w-full border rounded px-2 py-2 focus:outline-none"
                    value={editProfileData.program}
                    onChange={e => setEditProfileData({ ...editProfileData, program: e.target.value })}
                  >
                    {PROGRAMS.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Course</label>
                  <input
                    className="w-full border rounded p-2"
                    value={editProfileData.course}
                    onChange={e => setEditProfileData({ ...editProfileData, course: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Role</label>
                  <select
                    className="w-full border rounded px-2 py-2 focus:outline-none"
                    value={editProfileData.role}
                    onChange={e => setEditProfileData({ ...editProfileData, role: e.target.value })}
                  >
                    {ROLES.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1">Hobbies</label>
                  <HobbyTagsInput
                    value={editProfileData.hobbies}
                    onChange={(newTags: string[]) => setEditProfileData({ ...editProfileData, hobbies: newTags })}
                    placeholder="Add a hobby..."
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1">Interests</label>
                  <HobbyTagsInput
                    value={editProfileData.interests}
                    onChange={(newTags: string[]) => setEditProfileData({ ...editProfileData, interests: newTags })}
                    placeholder="Add an interest..."
                  />
                  <div className="mt-1 flex flex-wrap gap-2">
                    {PREDEFINED_INTERESTS.map(opt => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() =>
                          !editProfileData.interests.includes(opt) &&
                          setEditProfileData({
                            ...editProfileData,
                            interests: [...editProfileData.interests, opt]
                          })
                        }
                        className={`px-2 py-0.5 rounded text-xs
                          ${editProfileData.interests.includes(opt)
                            ? "bg-[#9b87f5] text-white"
                            : "bg-muted text-gray-700 hover:bg-gray-300"}
                        `}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1">Achievements (rich text allowed)</label>
                  <Textarea
                    value={editProfileData.achievements}
                    onChange={e => setEditProfileData({ ...editProfileData, achievements: e.target.value })}
                    placeholder="Type or paste HTML here for rich formatting."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1">About Me</label>
                  <Textarea
                    value={editProfileData.aboutMe}
                    onChange={e => setEditProfileData({ ...editProfileData, aboutMe: e.target.value })}
                    placeholder="Tell us about yourself!"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={cancelEditProfile}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-thrive-500 hover:bg-thrive-600"
                onClick={saveProfileChanges}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-card rounded-md shadow-sm border border-border p-4">
        <div className="flex flex-col items-center">
          <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="font-medium">Joined on</h3>
          <p className="text-muted-foreground">{profileData.joined}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

