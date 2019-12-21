# API DOCS

## generer the faker data

  test/ test
    data/ tables data
      user/ user table
        :numberOfUser/ number of users a generer

## API

  api/ api
    v1/ 1 version
      auth/ authufication
        register/
        login/
        forgotPassword/
        resetPassword/ with GET paramatre token=? and id=?
        confirmCompte/ with GET paramatre token=? and id=?

      user/   user
        profile/
        edit/

      admin/    admin
        users/  users with GET paramatre page=? and perPage=? and role=?
          :id/    id of user
            profile/
            edit/

# TOKEN

save token in header paramatre x-access-token
