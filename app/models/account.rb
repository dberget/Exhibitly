class Account < ApplicationRecord
     has_many :users, inverse_of: :account
     has_many :samples

     accepts_nested_attributes_for :users
end
