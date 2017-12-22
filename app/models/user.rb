class User < ApplicationRecord
     belongs_to :account, inverse_of: :users, foreign_key: 'account_id'

     has_secure_password
     validates_uniqueness_of :email
end
