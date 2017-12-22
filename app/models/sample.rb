class Sample < ApplicationRecord
     belongs_to :account 

    #  scope :account_samples, -> {
    #      where(account_id: @user.account_id)
    #  }
end
