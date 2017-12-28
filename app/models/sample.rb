class Sample < ApplicationRecord
  belongs_to :account 
  serialize :tags, Array

  def self.account_tags(account_id)
    self.where(account_id: account_id).pluck(:tags).flatten
  end

end
